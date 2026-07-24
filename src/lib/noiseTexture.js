let cached = null

export function getNoiseDataUrl() {
  if (cached) return cached

  const size = 160
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const imageData = ctx.createImageData(size, size)

  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.random() * 255
    imageData.data[i] = value
    imageData.data[i + 1] = value
    imageData.data[i + 2] = value
    imageData.data[i + 3] = Math.random() * 60
  }

  ctx.putImageData(imageData, 0, 0)
  cached = canvas.toDataURL()
  return cached
}
