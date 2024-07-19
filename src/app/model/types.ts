
export interface TodoList {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

export interface NewTask {
    user_id: string;
    title: string ;
    description: string;
    status: string;
    priority: string;
  }
  