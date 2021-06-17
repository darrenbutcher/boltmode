const UPDATE_PROFILE_MUTATION = `
  mutation update_profile_mutation($changes: users_set_input, $email_digest_setting: Boolean, $comment_mentions_web_setting: Boolean) {
    update_users(where: {}, _set: $changes) {
      affected_rows
    }
    
    send_email_digest: update_settings(where: { key: {_eq: send_email_digest}}, _set: { value: $email_digest_setting }) {
      affected_rows
    }
  
    notify_comment_mentions_web: update_settings(where: { key: {_eq: notify_comment_mentions_web}}, _set: { value: $comment_mentions_web_setting }) {
      affected_rows
    }
  }
`

export {
  UPDATE_PROFILE_MUTATION
}