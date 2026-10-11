/** Blog article path helpers — keep post bodies out of shared chunks. */

export function blogPath(slug: string) {
  return `/blogs/${slug}/`
}

export function blogsPath() {
  return '/blogs/'
}

export function guidesPath() {
  return '/guides/'
}

/** Forums hub path. */
export function forumsPath() {
  return '/forums/'
}
