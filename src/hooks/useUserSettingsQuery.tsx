import React from "react";
import { useQuery } from "@apollo/client";
import { Skeleton } from "antd";
import { useBannerDispatchContext } from "context/banners";
import {
  GetUserSettingsQuery,
  GetUserSettingsQueryVariables,
} from "gql/generated/types";
import { GET_USER_SETTINGS } from "gql/queries";

interface HookResult {
  data: GetUserSettingsQuery;
  loadingComp: JSX.Element;
}
export const useUserSettingsQuery = (): HookResult => {
  const dispatchBanner = useBannerDispatchContext();
  const { data, loading } = useQuery<
    GetUserSettingsQuery,
    GetUserSettingsQueryVariables
  >(GET_USER_SETTINGS, {
    onError(err) {
      dispatchBanner.errorBanner(
        `There was an error fetching your user settings: ${err.message}`
      );
    },
  });

  return { data, loadingComp: loading ? <Skeleton active /> : null };
};
