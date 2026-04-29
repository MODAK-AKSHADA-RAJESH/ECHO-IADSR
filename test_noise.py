import sys
sys.path.append('.')
from ml.inference import engine
engine.initialize()
t = 0
f = 0
for i in range(20):
    p = engine.get_user_profile(f'user{i}')
    if p:
        t += p['keep_count']
        f += p['noise_count']
print(f'{f} filtered out of {t+f} ({(f/(t+f))*100:.1f}%)')
