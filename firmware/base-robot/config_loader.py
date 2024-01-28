''' Load config file depending on environment (dev/prod)'''

import os
import configparser
# from logger import Logger

def load_config():
    rc = 0
    config = None
    # logger = MyLogger();

    environment = os.environ.get('ENVIRONMENT', 'dev')  # Default to 'dev'

    if environment == 'dev':
        config_file = 'dev.cfg'
    elif environment == 'prod':
        config_file = 'prod.cfg'
    else:
        # logger.info(f"Failed to load config file: Invalid environment 'environment'")
        return rc, config
    
    try:
        config = configparser.ConfigParser()
        config.read(config_file)
        # logger.info(f"Loaded config file: {config_file}")
    except Exception as e:
        # logger.error(f"Failed to load config file: {e.message}")
        rc = 1
    finally:
        return rc, config