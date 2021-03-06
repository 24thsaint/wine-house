module.exports = async function execute(context) {
  const response = await context.app.service('/api/users').find();

  if (response.total <= 1 || context.params.user.status === 'master') {
    return context;
  } else {
    throw new Error('Permission denied: User is not the contract master');
  }
};