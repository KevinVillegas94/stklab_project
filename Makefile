.PHONY: help venv run migrate superuser test coverage clean

help:
    @echo "Comandos disponibles:"
    @echo "  make venv       - Crea un entorno virtual (venv)"
    @echo "  make install    - Instala dependencias"
    @echo "  make run        - Inicia el servidor"
    @echo "  make migrate    - Ejecuta migraciones"
    @echo "  make superuser  - Crea un superusuario"
    @echo "  make test       - Ejecuta tests"
    @echo "  make coverage   - Genera reporte de cobertura"
    @echo "  make clean      - Elimina archivos temporales"

venv:
    python3 -m venv venv
    @echo "Activa el entorno con: source venv/bin/activate"

install:
    pip install -r requirements.txt

run:
    python manage.py runserver --settings=stklab_project.settings.dev
migrate:
    python manage.py migrate --settings=stklab_project.settings.dev
superuser:
    python manage.py createsuperuser --settings=stklab_project.settings.dev

test:
    python manage.py test --verbosity=2

coverage:
    coverage run --source='.' manage.py test
    coverage report
    coverage html

clean:
    find . -type d -name "__pycache__" -exec rm -r {} +
    find . -type f -name "*.pyc" -delete
    rm -rf htmlcov/ .coverage