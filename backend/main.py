from collections import defaultdict, deque
from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from pathlib import Path
from datetime import datetime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to store pipelines
PIPELINES_DIR = Path("saved_pipelines")
PIPELINES_DIR.mkdir(exist_ok=True)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


def is_dag(nodes, edges):
    """
    is_dag checks if the given graph is a Directed Acyclic Graph or not
    Args:
        nodes: List of node objects with 'id' field
        edges: List of edge objects with 'source' and 'target' fields
    Returns:
        bool: True if the graph is a DAG, False if it contains cycles
    """
    if not nodes:
        return True

    adjacency_list = defaultdict(list)
    in_degree = defaultdict(int)

    for node in nodes:
        node_id = node.get('id')
        if node_id:
            in_degree[node_id] = 0

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')

        if source and target:
            adjacency_list[source].append(target)
            in_degree[target] += 1

    queue = deque([node_id for node_id in in_degree if in_degree[node_id] == 0])

    processed_count = 0

    while queue:
        current = queue.popleft()
        processed_count += 1

        # Reduce in-degree for all neighbors
        for neighbor in adjacency_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return processed_count == len(nodes)


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: str = Form(...)):
    data = json.loads(pipeline)

    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": is_dag(nodes, edges)
    }


@app.post("/pipelines/save")
def save_pipeline(pipeline: str = Form(...)):
    """
    Save a pipeline to a local folder.
    Args:
        pipeline: JSON string containing nodes and edges
    Returns:
        dict: Contains pipeline_id, message, and file_path
    """
    try:
        data = json.loads(pipeline)
        nodes = data.get("nodes", [])
        edges = data.get("edges", [])

        # Generate a unique pipeline ID using timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        pipeline_id = f"pipeline_{timestamp}"

        # Create the pipeline data structure
        pipeline_data = {
            "id": pipeline_id,
            "nodes": nodes,
            "edges": edges,
            "created_at": datetime.now().isoformat(),
            "metadata": {
                "num_nodes": len(nodes),
                "num_edges": len(edges),
                "is_dag": is_dag(nodes, edges)
            }
        }

        # Save to file
        file_path = PIPELINES_DIR / f"{pipeline_id}.json"
        with open(file_path, 'w') as f:
            json.dump(pipeline_data, f, indent=2)

        return {
            "pipeline_id": pipeline_id,
            "message": "Pipeline saved successfully",
            "file_path": str(file_path),
            "metadata": pipeline_data["metadata"]
        }

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving pipeline: {str(e)}")


@app.get("/pipelines/list")
def list_pipelines():
    """
    List all saved pipelines.
    Returns:
        dict: Contains a list of all saved pipelines with their metadata
    """
    try:
        pipelines = []

        for file_path in PIPELINES_DIR.glob("*.json"):
            try:
                with open(file_path, 'r') as f:
                    pipeline_data = json.load(f)
                    pipelines.append({
                        "id": pipeline_data.get("id"),
                        "created_at": pipeline_data.get("created_at"),
                        "metadata": pipeline_data.get("metadata", {})
                    })
            except Exception as e:
                # Skip files that can't be read
                continue

        return {
            "count": len(pipelines),
            "pipelines": sorted(pipelines, key=lambda x: x.get("created_at", ""), reverse=True)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error listing pipelines: {str(e)}")


@app.get("/pipelines/{pipeline_id}")
def get_pipeline(pipeline_id: str):
    """
    Retrieve a saved pipeline by its ID.

    Args:
        pipeline_id: The unique identifier of the pipeline

    Returns:
        dict: The complete pipeline data including nodes, edges, and metadata
    """
    try:
        file_path = PIPELINES_DIR / f"{pipeline_id}.json"

        if not file_path.exists():
            raise HTTPException(status_code=404, detail=f"Pipeline '{pipeline_id}' not found")

        with open(file_path, 'r') as f:
            pipeline_data = json.load(f)

        return pipeline_data

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving pipeline: {str(e)}")
