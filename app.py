import config.config as config
from preprocessing.image_loader import load_image
from inference.trellis_model import TrellisModel

print("Model:", config.MODEL_NAME)
print("GPU:", config.USE_GPU)

image = load_image("chair.webp")

model = TrellisModel()
model.load()