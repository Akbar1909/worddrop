"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import useAppQuery from "@/hooks/useAppQuery";
import { request } from "@/services/request";
import useAppMutation from "@/hooks/useAppMutation";
import { returnArray } from "@/utils/common";
import { flushSync } from "react-dom";
import useGetWordGroups from "@/hooks/endpoints/useGetWordGroups";

interface Group {
  id: string;
  name: string;
}

interface GroupSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  definitionId: number;
}

export default function GroupSelectionModal({
  isOpen,
  onClose,
  definitionId,
}: GroupSelectionModalProps) {
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");

  const { data, refetch } = useGetWordGroups();

  const { mutate: addToGroup } = useAppMutation({
    mutationFn: () =>
      request.post(`/word-group/${selectedGroupId}/add-definition`, {
        definitionId,
      }),
    mutationKey: ["word-group"],
    onSuccess: () => {
      onClose();
    },
  });

  const { mutate } = useAppMutation({
    mutationFn: (body) => request.post("/word-group", body),
    mutationKey: ["create-word-group"],
    onSuccess: () => {
      setNewGroupName("");
      refetch();
    },
  });

  const handleCreateGroup = () => {
    if (newGroupName.trim()) {
      mutate({ wordGroupName: newGroupName });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Select a Group</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {returnArray(data?.data).map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    flushSync(() => {
                      setSelectedGroupId(group.id);
                    });

                    addToGroup();
                  }}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-md transition-colors mb-2"
                >
                  {group.word_group}
                </button>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="New group name"
                  className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleCreateGroup}
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
