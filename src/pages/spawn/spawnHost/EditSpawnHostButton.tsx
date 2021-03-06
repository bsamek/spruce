import React, { useState } from "react";
import styled from "@emotion/styled";
import Button, { Size } from "@leafygreen-ui/button";
import { useSpawnAnalytics } from "analytics";
import { EditSpawnHostModal } from "pages/spawn/spawnHost/index";
import { MyHost } from "types/spawn";

interface EditSpawnHostButtonProps {
  host: MyHost;
}
export const EditSpawnHostButton: React.FC<EditSpawnHostButtonProps> = ({
  host,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const spawnAnalytics = useSpawnAnalytics();
  return (
    <>
      <PaddedButton
        size={Size.XSmall}
        onClick={(e) => {
          e.stopPropagation();
          setOpenModal(true);
          spawnAnalytics.sendEvent({
            name: "Open the Edit Spawn Host Modal",
            hostId: host.id,
            status: host.status,
          });
        }}
      >
        Edit
      </PaddedButton>
      <EditSpawnHostModal
        onCancel={() => setOpenModal(false)}
        visible={openModal}
        host={host}
      />
    </>
  );
};

const PaddedButton = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
`;
