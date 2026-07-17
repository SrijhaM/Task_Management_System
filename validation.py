from datetime import datetime


def validate_title(title):
    """Check whether the title is empty."""

    if title.strip() == "":
        return False

    return True


def validate_priority(priority):
    """Check whether priority is valid."""

    priority = priority.capitalize()

    if priority in ["High", "Medium", "Low"]:
        return True

    return False


def validate_date(date):
    """Check whether date is in DD-MM-YYYY format."""

    try:
        datetime.strptime(date, "%d-%m-%Y")
        return True

    except ValueError:
        return False