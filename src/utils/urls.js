export function rawImageURL (artistConfig, artwork, size) {
  const uri = `https://raw.githubusercontent.com/${artistConfig.github_owner}/${artistConfig.github_repo}/${artistConfig.github_branch}/images`
  if (size)
    return `${uri}/${size}/${artwork.imagePath}`
  else 
    return `${uri}/${artwork.imagePath}`

}