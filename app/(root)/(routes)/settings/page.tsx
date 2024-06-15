import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="h-screen p-4 space-y-2">
      <h3 className="text-lg font-medium">Settings</h3>
      <div className="text-muted-foreground text-sm">
        {isPro
          ? "You are currentlly on a Pro plan."
          : "You are currentlly on a free plan."}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default SettingsPage;
