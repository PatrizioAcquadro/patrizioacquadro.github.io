"""Regenerate committed image assets from preserved originals (requires Pillow)."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets/source"
PUBLIC = ROOT / "public"

portrait = ImageOps.exif_transpose(Image.open(SOURCE / "PatrizioAcquadro.png")).convert("RGB")
for width in (320, 640, 960):
    output = PUBLIC / f"images/PatrizioAcquadro-{width}.webp"
    portrait.resize((width, width), Image.Resampling.LANCZOS).save(output, "WEBP", quality=85, method=6)
    print(f"{output.relative_to(ROOT)}: {output.stat().st_size:,} bytes")

icon = Image.open(SOURCE / "favicon.png").convert("RGBA")
for size, filename in ((32, "favicon.png"), (180, "apple-touch-icon.png")):
    output = PUBLIC / filename
    icon.resize((size, size), Image.Resampling.LANCZOS).save(output, "PNG", optimize=True)
    print(f"{output.relative_to(ROOT)}: {output.stat().st_size:,} bytes")
