from fastapi import FastAPI, Form
import json

app = FastAPI()


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
