export interface GroupItem {
  id: number;
  name: string;
  chatId: string;
}

export interface GroupSummaryItem {
  id: number;
  chatId: string;
  name: string;
  totalCoordinates: number;
  totalIsNotAccepted: number;
}

export interface GroupChatsInfo {
  id: string;
  sessionId: string;
  name: string;
  isGroup: boolean;
  createdAt: string;
  updatedAt: string;
}
