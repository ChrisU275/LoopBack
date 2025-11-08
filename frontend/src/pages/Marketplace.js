import { useState } from "react";
import { MarketplaceCard } from "./components/MarketplaceCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

const initialItems = [
  {
    id: 1,
    name: "Vintage Jacket",
    location: "Downtown District",
    type: "exchange",
    image: "https://images.unsplash.com/photo-1614990354198-b06764dcb13c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzYyNjA5MzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#e9708f",
  },
  {
    id: 2,
    name: "Wooden Chair",
    location: "Riverside Commons",
    type: "donation",
    image: "https://images.unsplash.com/photo-1636212644134-5867a3807ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBjaGFpcnxlbnwxfHx8fDE3NjI1ODgxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#f8bf65",
  },
  {
    id: 3,
    name: "Book Collection",
    location: "University Heights",
    type: "donation",
    image: "https://images.unsplash.com/photo-1630715216350-1a8f46f021bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMHN0YWNrfGVufDF8fHx8MTc2MjY0MDkwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#8093ca",
  },
  {
    id: 4,
    name: "Vintage Bicycle",
    location: "Oak Park",
    type: "exchange",
    image: "https://images.unsplash.com/photo-1761483202449-2ddcea4bb5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwdmludGFnZXxlbnwxfHx8fDE3NjI1ODEwMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#e9708f",
  },
  {
    id: 5,
    name: "Indoor Plants",
    location: "Garden District",
    type: "donation",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudHMlMjBpbmRvb3J8ZW58MXx8fHwxNzYyNjQ1ODc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#f8bf65",
  },
  {
    id: 6,
    name: "Coffee Maker",
    location: "Midtown Plaza",
    type: "donation",
    image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXBwbGlhbmNlc3xlbnwxfHx8fDE3NjI2NDQ2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#8093ca",
  },
];

const cardPositions = [
  { left: 159, top: 268 },
  { left: 551, top: 268 },
  { left: 943, top: 268 },
  { left: 162, top: 725 },
  { left: 554, top: 725 },
  { left: 946, top: 725 },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("marketplace");

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayItems = filteredItems.slice(0, 6);

  return (
    <div className="bg-[#e6dce7] relative size-full min-h-screen" data-name="marketplace">
      {/* Header */}
      <div className="absolute bg-[#955ea6] h-[96px] left-0 top-0 w-full" />
      <p
        className={`absolute font-['Coolvetica:Regular',sans-serif] leading-[normal] left-[67px] not-italic text-nowrap top-[24px] whitespace-pre cursor-pointer ${
          activeTab === "marketplace" ? "text-[#f8bf65] [text-shadow:rgba(0,0,0,0.25)_0px_4px_4px]" : "text-[#fbfefd]"
        }`}
        style={{ fontSize: "39px" }}
        onClick={() => setActiveTab("marketplace")}
      >
        marketplace
      </p>
      <p
        className={`absolute font-['Coolvetica:Regular',sans-serif] leading-[normal] left-[343px] not-italic text-[#fbfefd] text-nowrap top-[24px] whitespace-pre cursor-pointer`}
        style={{ fontSize: "39px" }}
        onClick={() => setActiveTab("profile")}
      >
        profile
      </p>
      <p
        className={`absolute font-['Coolvetica:Regular',sans-serif] leading-[normal] left-[510px] not-italic text-[#fbfefd] text-nowrap top-[24px] whitespace-pre cursor-pointer`}
        style={{ fontSize: "39px" }}
        onClick={() => setActiveTab("about")}
      >
        about
      </p>

      {/* Title */}
      <p
        className="absolute font-['Coolvetica:Regular',sans-serif] leading-[normal] left-[167px] not-italic text-[#4c223e] text-nowrap top-[161px] whitespace-pre"
        style={{ fontSize: "60px" }}
      >
        loopback
      </p>

      {/* Search Bar */}
      <div className="absolute bg-[#c9c7c9] h-[59px] left-[497px] rounded-[44px] top-[167px] w-[819px]" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="what are you shopping for today?"
        className="absolute left-[527px] top-[176px] bg-transparent border-none outline-none font-['Coolvetica:Regular',sans-serif] leading-[normal] not-italic text-[#4c223e] placeholder:text-[#9a9a9a] w-[520px]"
        style={{ fontSize: "34px" }}
      />
      <div className="absolute bg-[#8dbb6b] h-[59px] left-[1088px] rounded-[44px] top-[167px] w-[228px] cursor-pointer flex items-center justify-center">
        <p
          className="font-['Coolvetica:Regular',sans-serif] leading-[normal] not-italic text-[#fbfefd] text-nowrap whitespace-pre"
          style={{ fontSize: "34px" }}
        >
          search
        </p>
      </div>

      {/* Marketplace Items */}
      {displayItems.map((item, index) => (
        <MarketplaceCard
          key={item.id}
          item={item}
          position={cardPositions[index]}
          onClick={() => setSelectedItem(item)}
        />
      ))}

      {/* Add Button */}
      <div
        className="absolute left-[1251px] size-[142px] top-[861px] cursor-pointer"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <div className="absolute bottom-[-5.63%] left-[-2.82%] right-[-2.82%] top-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 150 150">
            <g filter="url(#filter0_d_1_67)" id="Ellipse 1">
              <circle cx="75" cy="71" fill="var(--fill-0, #8DBB6B)" r="71" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="150" id="filter0_d_1_67" width="150" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_67" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_67" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p
        className="absolute font-['Coolvetica:Regular',sans-serif] h-[103px] leading-[normal] left-[1298px] not-italic text-[#fbfefd] top-[872px] w-[115px] pointer-events-none"
        style={{ fontSize: "100px" }}
      >
        +
      </p>

      {/* Item Detail Dialog */}
      <Dialog open={selectedItem !== null} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
            <DialogDescription>{selectedItem?.location}</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full" style={{ backgroundColor: selectedItem.color, color: "#fff" }}>
                  {selectedItem.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                This item is available for {selectedItem.type} in {selectedItem.location}.
                Contact the owner to arrange pickup or exchange details.
              </p>
              <Button className="w-full" style={{ backgroundColor: "#8dbb6b" }}>
                Contact Owner
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>List an Item</DialogTitle>
            <DialogDescription>
              Share items you want to donate or exchange with your community.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const newItem = {
                id: items.length + 1,
                name: formData.get("name"),
                location: formData.get("location"),
                type: formData.get("type"),
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
                color: formData.get("type") === "exchange" ? "#e9708f" : ["#f8bf65", "#8093ca"][Math.floor(Math.random() * 2)],
              };
              setItems([...items, newItem]);
              setIsAddDialogOpen(false);
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input id="name" name="name" required placeholder="e.g., Vintage Lamp" />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" required placeholder="e.g., Downtown District" />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Select name="type" defaultValue="donation" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donation">Donation</SelectItem>
                  <SelectItem value="exchange">Exchange</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" style={{ backgroundColor: "#8dbb6b" }}>
              List Item
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
