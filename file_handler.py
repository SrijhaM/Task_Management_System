import json
import os

FILE_NAME = "tasks.json"


def load_tasks():
    """Load tasks from JSON file."""

    if not os.path.exists(FILE_NAME):
        return []

    try:
        with open(FILE_NAME, "r") as file:
            tasks = json.load(file)
            return tasks

    except json.JSONDecodeError:
        return []


def save_tasks(tasks):
    """Save tasks into JSON file."""

    with open(FILE_NAME, "w") as file:
        json.dump(tasks, file, indent=4)