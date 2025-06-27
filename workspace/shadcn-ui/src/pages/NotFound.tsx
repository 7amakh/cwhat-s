import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-emerald-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button 
          onClick={() => navigate("/")}
          variant="default"
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Go to Chats
        </Button>
      </div>
    </div>
  );
}