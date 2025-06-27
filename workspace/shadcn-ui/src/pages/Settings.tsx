import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Camera, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("John Doe");
  const [profileStatus, setProfileStatus] = useState("Available");
  const [editingName, setEditingName] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  const handleBack = () => {
    navigate("/");
  };

  const saveProfile = () => {
    setEditingName(false);
    setEditingStatus(false);
    // In a real app, we would save to a backend or localStorage
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex items-center p-4 bg-emerald-500 text-white">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBack}
            className="text-white hover:bg-emerald-600 mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
        
        <Tabs defaultValue="profile" className="flex-1 overflow-hidden">
          <TabsList className="w-full bg-white border-b h-14 rounded-none">
            <TabsTrigger value="profile" className="flex-1">
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex-1">
              Privacy
            </TabsTrigger>
          </TabsList>
          
          <div className="overflow-y-auto h-full pb-20">
            <TabsContent value="profile" className="p-4">
              <div className="flex flex-col items-center mb-8 mt-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/assets/avatar.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="absolute bottom-0 right-0 rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    <Camera size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="flex gap-2">
                    {editingName ? (
                      <Input 
                        id="name"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <div className="flex-1 py-2 px-3 border rounded-md bg-white">
                        {profileName}
                      </div>
                    )}
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        if (editingName) {
                          saveProfile();
                        } else {
                          setEditingName(true);
                        }
                      }}
                    >
                      {editingName ? "Save" : <Edit size={16} />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex gap-2">
                    {editingStatus ? (
                      <Input 
                        id="status"
                        value={profileStatus}
                        onChange={(e) => setProfileStatus(e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <div className="flex-1 py-2 px-3 border rounded-md bg-white">
                        {profileStatus}
                      </div>
                    )}
                    
                    <Button 
                      variant="outline"
                      onClick={() => {
                        if (editingStatus) {
                          saveProfile();
                        } else {
                          setEditingStatus(true);
                        }
                      }}
                    >
                      {editingStatus ? "Save" : <Edit size={16} />}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-500">Enable dark theme</p>
                  </div>
                  <Switch 
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Message Notifications</h3>
                  <p className="text-sm text-gray-500">Get notified when you receive messages</p>
                </div>
                <Switch 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Group Notifications</h3>
                  <p className="text-sm text-gray-500">Get notified about group activities</p>
                </div>
                <Switch 
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">In-App Sounds</h3>
                  <p className="text-sm text-gray-500">Play sounds for messages and calls</p>
                </div>
                <Switch 
                  defaultChecked
                />
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Read Receipts</h3>
                  <p className="text-sm text-gray-500">Show when you've read messages</p>
                </div>
                <Switch 
                  checked={readReceipts}
                  onCheckedChange={setReadReceipts}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Last Seen</h3>
                  <p className="text-sm text-gray-500">Show when you were last online</p>
                </div>
                <Switch 
                  defaultChecked
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Profile Photo</h3>
                  <p className="text-sm text-gray-500">Who can see your profile photo</p>
                </div>
                <select className="border rounded p-2">
                  <option>Everyone</option>
                  <option>Contacts</option>
                  <option>Nobody</option>
                </select>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
}