" Wrapper class for python's built-in logging module "

import logging

class Logger:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Logger, cls).__new__(cls)
            cls._instance.logger = cls._configure_logger()
        return cls._instance.logger

    @staticmethod
    def _configure_logger():
        logger = logging.getLogger("my_logger")
        logger.setLevel(logging.DEBUG)

        file_handler = logging.FileHandler("custom_log_file.log")
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        file_handler.setFormatter(formatter)

        logger.addHandler(file_handler)

        return logger
