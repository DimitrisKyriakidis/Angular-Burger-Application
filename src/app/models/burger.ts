export interface Burgers {
  quantity: number
  id: string
  seqNo: number
  url: string
  iconUrl: string
  courseListIcon: string
  description: string
  longDescription?: string
  category: string
  lessonsCount: number
  promo: boolean
  price: number
}

export function compareCourses(c1: Burgers, c2: Burgers) {
  const compare = c1.seqNo - c2.seqNo

  if (compare > 0) {
    return 1
  } else if (compare < 0) {
    return -1
  } else return 0
}
