// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operationName) => {
    const { body } = req
    return (
      body.hasOwnProperty('operationName') && body.operationName === operationName
    )
}