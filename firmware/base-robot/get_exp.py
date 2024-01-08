import configparser
import requests
import zipfile
import io
import os
import shutil
from logger import log_error, log_success

def clear_dir(target_dir):
    try:
        # iterate over all items in the directory
        for item in os.listdir(target_dir):
            item_path = os.path.join(target_dir, item)

            # check if it's a file and remove it
            if os.path.isfile(item_path):
                os.unlink(item_path)

            # if it's a directory, remove it recursively
            elif os.path.isdir(item_path):
                shutil.rmtree(item_path)

    except Exception as e:
        log_error(f"Error while clearing directory {target_dir}: {e}")

def download_code(url, target_dir):
    try:
        response = requests.get(url)
    
        if response.status_code == 200:
            # create the local directory if it doesn't exist
            os.makedirs(target_dir, exist_ok=True)
            # clear content of the existing local directory
            clear_dir(target_dir)
            
            with zipfile.ZipFile(io.BytesIO(response.content)) as zip_file:
               # extract all contents to the target directory
               zip_file.extractall(target_dir)

            log_success(f"Downloaded files to {target_dir}")
        else:
            log_error(f"Failed to download files. Status code: {response.status_code}")
    except Exception as e:
        log_error(f"Error while downloading files: {e}")
    
if __name__ == "__main__":
    config = configparser.ConfigParser()
    config.read_file(open(r'settings.cfg'))
    hostname = config.get('SERVER', 'hostname')
    port = int(config.get('SERVER', 'port'))
    url = f"http://{hostname}:{port}/files"
    print(url)
    target_dir = f"{os.getcwd()}/exp"
    download_code(url, target_dir)

