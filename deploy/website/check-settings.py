"""Fail a deploy job early when its secrets or settings are missing or unsafe."""
import os
import re
import sys

missing = [name for name in sys.argv[1:] if not os.environ.get(name)]
deploy_dir = os.environ.get('DEPLOY_DIR', '')
if not re.fullmatch(r'/[A-Za-z0-9_./-]+', deploy_dir) or '..' in deploy_dir:
    missing.append('a valid deployment directory')
if not os.environ.get('SSH_PORT', '').isdigit():
    missing.append('a numeric SSH port')
if missing:
    raise SystemExit('Missing or invalid deployment settings: ' + ', '.join(missing))
