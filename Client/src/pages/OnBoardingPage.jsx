import React from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api.js";

const OnBoardingPage = () => {
  const { authUser } = useAuthUser();

  const [formState, setFormState] = React.useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePicture: authUser?.profilePicture || null,
  });

  const { mutate: OnBoardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: (data) => {
      QueryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Onboarding completed successfully!");
    },
  });
  return (
    <div
      class
      name="min-h-screen bg-base-100 flex items-center justify-center p-4"
    >
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8 ">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Onboarding
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
