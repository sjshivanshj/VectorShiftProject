from fastapi import FastAPI, Form
import json

app = FastAPI()

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: str = Form(...)):
    data = json.loads(pipeline)

    nodes = data.get("nodes", [])
    edges = data.get("edges", [])

    return {
        "num_nodes": len(nodes),
        "num_edges": len(edges),
        "is_dag": True
    }
