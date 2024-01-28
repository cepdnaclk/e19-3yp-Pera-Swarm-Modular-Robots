import os

environment = os.environ.get('ENVIRONMENT', 'dev')  # Default to 'dev' if ENVIRONMENT is not set
print(environment)