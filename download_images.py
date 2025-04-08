import os
import requests
from pathlib import Path

# Create directories if they don't exist
Path('assets/images/projects').mkdir(parents=True, exist_ok=True)

# Image URLs
images = {
    'assets/images/hero-bg.jpg': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80',
    'assets/images/projects/villa-1.jpg': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    'assets/images/projects/township-1.jpg': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    'assets/images/projects/resort-1.jpg': 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
}

# Download images
for path, url in images.items():
    print(f'Downloading {path}...')
    response = requests.get(url)
    if response.status_code == 200:
        with open(path, 'wb') as f:
            f.write(response.content)
        print(f'Successfully downloaded {path}')
    else:
        print(f'Failed to download {path}')

print('All downloads completed!') 