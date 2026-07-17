import uuid
from datetime import datetime

from file_handler import load_tasks, save_tasks
from validation import validate_title, validate_priority, validate_date

def add_task():
        print("\n====== ADD NEW TASK ======\n")

        tasks = load_tasks()

        title = input("Enter Task Title: ")

        if not validate_title(title):
            print("Task title cannot be empty.")
            return

        description = input("Enter Description: ")

        priority = input("Enter Priority (High/Medium/Low): ")

        if not validate_priority(priority):
            print("Invalid priority.")
            return

        priority = priority.capitalize()

        due_date = input("Enter Due Date (DD-MM-YYYY): ")

        if not validate_date(due_date):
            print("Invalid date format.")
            return

        task_id = str(uuid.uuid4())[:8]

        created_date = datetime.now().strftime("%d-%m-%Y")

        task = {
            "id": task_id,
            "title": title,
            "description": description,
            "priority": priority,
            "status": "Pending",
            "created_date": created_date,
            "due_date": due_date
        }

        tasks.append(task)

        save_tasks(tasks)

        print("\nTask added successfully.")

def display_tasks(tasks):

    print("\n" + "=" * 90)

    print(f"{'ID':<10}{'TITLE':<25}{'PRIORITY':<12}{'STATUS':<15}{'DUE DATE'}")

    print("=" * 90)

    for task in tasks:

        print(f"{task['id']:<10}"
              f"{task['title']:<25}"
              f"{task['priority']:<12}"
              f"{task['status']:<15}"
              f"{task['due_date']}")

    print("=" * 90)

def view_tasks():

    tasks = load_tasks()

    if not tasks:
        print("\nNo tasks found.")
        return

    display_tasks(tasks)

def search_task():

    tasks = load_tasks()

    if not tasks:
        print("\nNo tasks available.")
        return

    search = input("\nEnter Task Title to Search: ").lower()

    found = False

    for task in tasks:

        if search in task["title"].lower():

            print("\n========== TASK FOUND ==========")

            print("ID          :", task["id"])
            print("Title       :", task["title"])
            print("Description :", task["description"])
            print("Priority    :", task["priority"])
            print("Status      :", task["status"])
            print("Created Date:", task["created_date"])
            print("Due Date    :", task["due_date"])

            found = True

    if not found:
        print("\nTask not found.")

def update_task():

    tasks = load_tasks()

    if not tasks:
        print("\nNo tasks available.")
        return

    task_id = input("\nEnter Task ID to Update: ")

    found = False

    for task in tasks:

        if task["id"] == task_id:

            print("\nCurrent Details")

            print("Title :", task["title"])
            print("Description :", task["description"])
            print("Priority :", task["priority"])
            print("Due Date :", task["due_date"])

            new_title = input(
                f"Enter New Title (Press Enter to keep '{task['title']}'): "
            ).strip()

            if new_title:

                if not validate_title(new_title):
                    print("Invalid Title.")
                    return

            else:
                new_title = task["title"]

            new_description = input(
                f"Enter New Description (Press Enter to keep current): "
            ).strip()

            if not new_description:
                new_description = task["description"]

            new_priority = input(
                f"Enter New Priority (High/Medium/Low) (Press Enter to keep '{task['priority']}'): "
            ).strip()

            if new_priority:

                if not validate_priority(new_priority):
                    print("Invalid Priority.")
                    return

                new_priority = new_priority.capitalize()

            else:
                new_priority = task["priority"]

            new_due_date = input(
                f"Enter New Due Date (DD-MM-YYYY) (Press Enter to keep '{task['due_date']}'): "
            ).strip()

            if new_due_date:

                if not validate_date(new_due_date):
                    print("Invalid Date.")
                    return

            else:
                new_due_date = task["due_date"]

            task["title"] = new_title
            task["description"] = new_description
            task["priority"] = new_priority
            task["due_date"] = new_due_date

            save_tasks(tasks)

            print("\nTask Updated Successfully.")

            found = True

            break

    if not found:

        print("\nTask ID not found.")

def delete_task():

    tasks = load_tasks()

    if not tasks:
        print("\nNo tasks available.")
        return

    task_id = input("\nEnter Task ID to Delete: ")

    found = False

    for task in tasks:

        if task["id"] == task_id:

            print("\nTask Found")

            print("Title :", task["title"])
            print("Priority :", task["priority"])
            print("Status :", task["status"])

            confirm = input("\nAre you sure? (Y/N): ").upper()

            if confirm == "Y":

                tasks.remove(task)

                save_tasks(tasks)

                print("\nTask Deleted Successfully.")

            else:

                print("\nDeletion Cancelled.")

            found = True

            break

    if not found:

        print("\nTask ID not found.")

def mark_completed():

    tasks = load_tasks()

    if not tasks:
        print("\nNo tasks available.")
        return

    task_id = input("\nEnter Task ID: ")

    found = False

    for task in tasks:

        if task["id"] == task_id:

            if task["status"] == "Completed":

                print("\nTask is already completed.")

                found = True

                break

            task["status"] = "Completed"

            save_tasks(tasks)

            print("\nTask marked as Completed.")

            found = True

            break

    if not found:

        print("\nTask ID not found.")

def filter_tasks():

    tasks = load_tasks()

    if not tasks:
        print("\nNo tasks available.")
        return

    print("\n===== FILTER TASKS =====")

    print("1. Pending Tasks")
    print("2. Completed Tasks")
    print("3. High Priority")
    print("4. Medium Priority")
    print("5. Low Priority")

    choice = input("Enter your choice: ")

    if choice == "1":
        filter_type = "Pending"
        key = "status"

    elif choice == "2":
        filter_type = "Completed"
        key = "status"

    elif choice == "3":
        filter_type = "High"
        key = "priority"

    elif choice == "4":
        filter_type = "Medium"
        key = "priority"

    elif choice == "5":
        filter_type = "Low"
        key = "priority"

    else:
        print("Invalid Choice.")
        return

    filtered_tasks = []

    found = False

    for task in tasks:

        if task[key] == filter_type:

            filtered_tasks.append(task)

            found = True

    if not found:
        print("\nNo matching tasks found.")

    else:
        display_tasks(filtered_tasks)

def menu():
    while True:
        print("\n========== MENU ==========")
        print("1. Add Task")
        print("2. View Tasks")
        print("3. Search Task")
        print("4. Update Task")
        print("5. Delete Task")
        print("6. Mark Task Completed")
        print("7. Filter Tasks")
        print("8. Exit")

        choice = input("Enter your choice: ")

        # if choice == "1":
        #     print("Add Task Selected")
        if choice == "1":
            add_task()

        elif choice == "2":
            view_tasks()

        elif choice == "3":
            search_task()

        elif choice == "4":
            update_task()

        elif choice == "5":
            delete_task()

        elif choice == "6":
            mark_completed()

        elif choice == "7":
            filter_tasks()

        elif choice == "8":
            print("Thank you for using Task Management System!")
            break

        else:
            print("Invalid choice. Please try again.")

