"""
This script creates a venv and installs pip and packages 
needed by the user for the experiment in the directory with 
the source files for the experiment. 

Adapted from: https://gist.github.com/vsajip/4673395 
"""

import os
import os.path
from subprocess import Popen, PIPE
import sys
from threading import Thread
from urllib.parse import urlparse
from urllib.request import urlretrieve
import venv
import configparser

class ExtendedEnvBuilder(venv.EnvBuilder):
    """
    This builder installs setuptools and pip as well as the
    specified packages into the created environment.
    """

    def __init__(self):
        super().__init__(
                # Enable global packages 
                # (they will be shadowed if installed later from pip)
                system_site_packages=True, 
                # Don't clear contents of the target dir
                clear=False,
                symlinks=True,
                upgrade=False,
                with_pip=True,
                prompt=None,
                upgrade_deps=False)

    def post_setup(self, context):
        """
        Set up any packages which need to be pre-installed into the
        environment being created.

        :param context: The information for the environment creation request
                        being processed.
        """
        os.environ['VIRTUAL_ENV'] = context.env_dir
        # TODO Install requirements.txt
        print("Now running post setup")


def main(args=None):
    compatible = True
    if sys.version_info < (3, 3):
        compatible = False
    elif not hasattr(sys, 'base_prefix'):
        compatible = False
    if not compatible:
        raise ValueError('This script is only for use with '
                         'Python 3.3 or later')
    else:
        
        config = configparser.ConfigParser()
        config.read_file(open(r'settings.cfg'))
        exp_folder = config.get('LOCAL', 'exp_folder')
        builder = ExtendedEnvBuilder()
        builder.create(f"{exp_folder}/.venv")

if __name__ == '__main__':
    rc = 1
    try:
        main()
        rc = 0
    except Exception as e:
        print('Error: %s' % e, file=sys.stderr)
    sys.exit(rc)
