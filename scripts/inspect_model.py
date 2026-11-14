"""Print the trusted local model's feature metadata without predicting."""
from pathlib import Path
import joblib
root = Path(__file__).resolve().parents[1]
path = root / 'models' / 'irrigation_champion.joblib'
print('Artifact:', path)
model = joblib.load(path)
print('Type:', type(model).__name__)
print('Feature names:', getattr(model, 'feature_names_in_', None))
print('Classes:', getattr(model, 'classes_', None))
print('Pipeline steps:', list(getattr(model, 'named_steps', {})))
