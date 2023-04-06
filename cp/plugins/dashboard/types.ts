/**
 * DashboardType is an object with four properties, each of which is a number.
 * @property {number} totalUser - Total number of users
 * @property {number} totalStakeToken - The total amount of stake tokens in the system
 * @property {number} totalPost - Total number of posts
 * @property {number} totalVote - total number of votes
 */
export type DashboardType = {
  totalUser: number
  totalStakeToken: number
  totalPost: number
  totalVote: number
}
