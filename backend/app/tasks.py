from celery_app import celery_app


@celery_app.task(name="app.tasks.health_check")
def health_check():
    return {"status": "healthy"}


@celery_app.task(name="app.tasks.process_skill")
def process_skill(skill_id: int):
    return {"skill_id": skill_id, "status": "processed"}