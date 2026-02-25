import RequireName from "@/components/RequireName";
import NightDetailsScreen from "@/screens/NightDetailsScreen";

export default async function Page({ params }){
  return (
    <RequireName>
      <NightDetailsScreen dayKey={params.dayKey} />
    </RequireName>
  );
}
