import sys
sys.path.append('.')
from ml.inference import engine
engine.initialize()
p = engine.get_user_profile('user5')
print(f"Signal: {p['keep_count']} kept, {p['noise_count']} filtered")
