import { normalizedUsers } from '../../fixtures';
import { PUBLISH_REVIEW } from '../constants';

const defaultUsers = normalizedUsers.reduce(
  (acc, user) => ({ ...acc, [user.id]: user }),
  {}
);

const usersReducer = (users = defaultUsers, action) => {
  switch (action.type) {
    case PUBLISH_REVIEW:
      const newUser = {
        id: action.generatedUuidsMap.userId,
        name: action.payload.reviewInfo.name,
      };
      return {
        ...users,
        [newUser.id]: newUser,
      };
    default:
      return users;
  }
};

export default usersReducer;
