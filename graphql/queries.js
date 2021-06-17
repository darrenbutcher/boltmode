const GET_USER_ACCOUNT_QUERY = `
  query GetUserAccount {
      info: users {
        uid
        email
        first_name
        last_name
        username
        bio
        settings {      
          key
          value
        }
        plan {
          name
          price
        }
      }
  }
`

const GET_USER_ACCOUNT_ALT_QUERY = `
  query GetUserAccountAlt {
      info: users {
        uid
        name
        email
        first_name
        last_name
        username
        bio
        customer_id
      }
  }
`

const GET_FEED_QUERY = `
  query GetFeed {
    feed {
      content
      id
      title
    }
  }
`

export {
  GET_USER_ACCOUNT_QUERY,
  GET_USER_ACCOUNT_ALT_QUERY,
  GET_FEED_QUERY
}