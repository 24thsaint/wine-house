module.exports = async function execute(context) {
  if (context.params.user.status === 'master') {
    return context;
  } else {
    throw new Error('Permission denied: User is not the contract master');
  }
};