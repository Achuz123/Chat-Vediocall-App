import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";

const FriendPage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  return (
    <div className="m-2">
      {loadingFriends ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <div className="card bg-base-200 p-6 text-center">
          <h3 className="font-semibold text-lg mb-2">No friends yet</h3>
          <p className="text-base-content opacity-70">
            Connect with language partners below to start practicing together!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendPage;
