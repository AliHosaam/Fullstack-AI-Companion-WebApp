"use client";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import axios from "axios";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const onSubscription = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={onSubscription}
      size="sm"
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionButton;
