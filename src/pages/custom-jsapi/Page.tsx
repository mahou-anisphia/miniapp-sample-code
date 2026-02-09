import React from "react";
import { FiTerminal } from "react-icons/fi";

export const CustomJsapiPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FiTerminal className="text-purple-600" />
          Custom JSAPI
        </h1>
        <p className="text-gray-600">
          Test VTDeviceService custom APIs for device operations
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Coming Soon</h2>
        <p className="text-gray-500 text-center max-w-md">
          Custom JSAPI features are currently under development. Check back
          later for VTDeviceService APIs including queryContacts, addToWhiteList,
          and removeFromWhiteList.
        </p>
      </div>
    </div>
  );
};

/*
import { useState } from "react";
import { FiSearch, FiPlus, FiMinus } from "react-icons/fi";
import { queryContacts } from "../../api/viettel/device/queryContacts";
import { addToWhiteList } from "../../api/viettel/device/addToWhiteList";
import { removeFromWhiteList } from "../../api/viettel/device/removeFromWhiteList";
import { useApiCall } from "../../hooks/useApiCall";
import { StatusMessage } from "../../components/common/StatusMessage";

// Query Contacts state
const [queryName, setQueryName] = useState("");
const [queryPhone, setQueryPhone] = useState("");
const [queryLimit, setQueryLimit] = useState("10");
const [queryAnchor, setQueryAnchor] = useState("0");
const [contactsResult, setContactsResult] = useState<string>("");

// WhiteList state
const [addMiniAppId, setAddMiniAppId] = useState("");
const [removeMiniAppId, setRemoveMiniAppId] = useState("");

const queryCall = useApiCall();
const addWhiteListCall = useApiCall();
const removeWhiteListCall = useApiCall();

const handleQueryContacts = async () => {
  setContactsResult("");
  const result = await queryCall.run(
    () =>
      queryContacts({
        ...(queryName && { name: queryName }),
        ...(queryPhone && { phoneNumber: queryPhone }),
        ...(queryLimit && { limit: parseInt(queryLimit, 10) }),
        ...(queryAnchor && { anchor: parseInt(queryAnchor, 10) }),
      }),
    {
      successMessage: "Contacts queried successfully",
    }
  );
  if (result) {
    if (!result.contacts || result.contacts.length === 0) {
      setContactsResult("No contacts found");
    } else {
      setContactsResult(JSON.stringify(result, null, 2));
    }
  }
};

const handleAddToWhiteList = async () => {
  if (!addMiniAppId.trim()) {
    addWhiteListCall.showFeedback("error", "Please enter a Mini App ID");
    return;
  }
  await addWhiteListCall.run(
    () => addToWhiteList({ miniAppId: addMiniAppId.trim() }),
    {
      successMessage: `Mini App "${addMiniAppId}" added to white list`,
    }
  );
};

const handleRemoveFromWhiteList = async () => {
  if (!removeMiniAppId.trim()) {
    removeWhiteListCall.showFeedback("error", "Please enter a Mini App ID");
    return;
  }
  await removeWhiteListCall.run(
    () => removeFromWhiteList({ miniAppId: removeMiniAppId.trim() }),
    {
      successMessage: `Mini App "${removeMiniAppId}" removed from white list`,
    }
  );
};

--- JSX for Query Contacts, Add/Remove WhiteList, and Info Section was here ---
*/
