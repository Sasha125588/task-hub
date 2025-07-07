import {
	Activity,
	AlertTriangle,
	Archive,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	AtSign,
	Award,
	BarChart,
	Battery,
	BatteryLow,
	Bell,
	Bike,
	Bird,
	Bold,
	Bookmark,
	Bot,
	Brush,
	Bug,
	Bus,
	Cake,
	Calculator,
	Calendar,
	Camera,
	Car,
	CheckCircle,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Clock,
	Cloud,
	CloudRain,
	Code,
	Coffee,
	Command,
	Compass,
	Copy,
	CreditCard,
	Database,
	DollarSign,
	Download,
	Droplets,
	Edit,
	Eraser,
	Expand,
	ExternalLink,
	Eye,
	EyeOff,
	File,
	FileText,
	Files,
	Filter,
	Fish,
	Flame,
	Flower,
	Focus,
	Folder,
	FolderOpen,
	Fuel,
	Gift,
	Globe,
	Grid,
	Hammer,
	Hash,
	Heart,
	HelpCircle,
	Home,
	Image,
	Info,
	Italic,
	Laptop,
	Layout,
	Leaf,
	Lightbulb,
	LineChart,
	Link,
	List,
	Lock,
	Mail,
	Map as MapIcon,
	MapPin,
	Maximize,
	Medal,
	Menu,
	MessageCircle,
	MessageSquare,
	Mic,
	MicOff,
	Minimize,
	Minus,
	Monitor,
	Moon,
	MoreHorizontal,
	MoreVertical,
	Music,
	Navigation,
	Package,
	Paintbrush,
	Palette,
	PanelLeft,
	PanelRight,
	Paperclip,
	PartyPopper,
	Pause,
	PenTool,
	Pencil,
	Percent,
	Phone,
	PieChart,
	Pizza,
	Plane,
	Play,
	Plus,
	Printer,
	QrCode,
	RefreshCw,
	RotateCcw,
	Ruler,
	Save,
	Scan,
	Scissors,
	Search,
	Send,
	Server,
	Settings,
	Share,
	Shield,
	ShoppingBag,
	ShoppingCart,
	Shrink,
	Sidebar,
	Signal,
	SkipBack,
	SkipForward,
	Smartphone,
	SortAsc,
	SortDesc,
	Star,
	Sun,
	Tablet,
	Tag,
	Target,
	Terminal,
	Thermometer,
	Timer,
	ToggleLeft,
	ToggleRight,
	Train,
	Trash2,
	TreePine,
	TrendingDown,
	TrendingUp,
	Trophy,
	Truck,
	Type,
	Umbrella,
	Underline,
	Unlock,
	Upload,
	User,
	UserCheck,
	UserMinus,
	UserPlus,
	UserX,
	Users,
	Video,
	Volume2,
	VolumeX,
	Wallet,
	Wifi,
	WifiOff,
	Wind,
	Wrench,
	X,
	XCircle,
	Zap,
	ZoomIn,
	ZoomOut
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface IconData {
	name: string
	Component: LucideIcon
	searchTerms: string
}

const createSearchTerms = (name: string): string => {
	const friendlyName = name
		.replace(/([A-Z])/g, " $1")
		.replace(/^./, str => str.toUpperCase())
		.trim()

	return `${name.toLowerCase()} ${friendlyName.toLowerCase()}`
}

export const ICON_REGISTRY: IconData[] = [
	{ name: "Home", Component: Home, searchTerms: createSearchTerms("Home") },
	{ name: "Bot", Component: Bot, searchTerms: createSearchTerms("Bot") },
	{ name: "Music", Component: Music, searchTerms: createSearchTerms("Music") },
	{ name: "User", Component: User, searchTerms: createSearchTerms("User") },
	{
		name: "Settings",
		Component: Settings,
		searchTerms: createSearchTerms("Settings")
	},
	{
		name: "Search",
		Component: Search,
		searchTerms: createSearchTerms("Search")
	},
	{ name: "Bell", Component: Bell, searchTerms: createSearchTerms("Bell") },
	{ name: "Mail", Component: Mail, searchTerms: createSearchTerms("Mail") },
	{ name: "Phone", Component: Phone, searchTerms: createSearchTerms("Phone") },
	{
		name: "Calendar",
		Component: Calendar,
		searchTerms: createSearchTerms("Calendar")
	},
	{ name: "Clock", Component: Clock, searchTerms: createSearchTerms("Clock") },
	{ name: "Heart", Component: Heart, searchTerms: createSearchTerms("Heart") },
	{ name: "Star", Component: Star, searchTerms: createSearchTerms("Star") },
	{ name: "Plus", Component: Plus, searchTerms: createSearchTerms("Plus") },
	{ name: "Minus", Component: Minus, searchTerms: createSearchTerms("Minus") },
	{ name: "Edit", Component: Edit, searchTerms: createSearchTerms("Edit") },
	{
		name: "Trash2",
		Component: Trash2,
		searchTerms: createSearchTerms("Trash2")
	},
	{ name: "Save", Component: Save, searchTerms: createSearchTerms("Save") },
	{
		name: "Download",
		Component: Download,
		searchTerms: createSearchTerms("Download")
	},
	{
		name: "Upload",
		Component: Upload,
		searchTerms: createSearchTerms("Upload")
	},
	{ name: "Share", Component: Share, searchTerms: createSearchTerms("Share") },
	{ name: "Copy", Component: Copy, searchTerms: createSearchTerms("Copy") },
	{ name: "Eye", Component: Eye, searchTerms: createSearchTerms("Eye") },
	{
		name: "EyeOff",
		Component: EyeOff,
		searchTerms: createSearchTerms("EyeOff")
	},
	{ name: "Lock", Component: Lock, searchTerms: createSearchTerms("Lock") },
	{
		name: "Unlock",
		Component: Unlock,
		searchTerms: createSearchTerms("Unlock")
	},
	{
		name: "Shield",
		Component: Shield,
		searchTerms: createSearchTerms("Shield")
	},
	{
		name: "AlertTriangle",
		Component: AlertTriangle,
		searchTerms: createSearchTerms("AlertTriangle")
	},
	{
		name: "CheckCircle",
		Component: CheckCircle,
		searchTerms: createSearchTerms("CheckCircle")
	},
	{
		name: "XCircle",
		Component: XCircle,
		searchTerms: createSearchTerms("XCircle")
	},
	{ name: "Info", Component: Info, searchTerms: createSearchTerms("Info") },
	{
		name: "HelpCircle",
		Component: HelpCircle,
		searchTerms: createSearchTerms("HelpCircle")
	},
	{ name: "Menu", Component: Menu, searchTerms: createSearchTerms("Menu") },
	{ name: "X", Component: X, searchTerms: createSearchTerms("X") },
	{
		name: "ChevronLeft",
		Component: ChevronLeft,
		searchTerms: createSearchTerms("ChevronLeft")
	},
	{
		name: "ChevronRight",
		Component: ChevronRight,
		searchTerms: createSearchTerms("ChevronRight")
	},
	{
		name: "ChevronUp",
		Component: ChevronUp,
		searchTerms: createSearchTerms("ChevronUp")
	},
	{
		name: "ChevronDown",
		Component: ChevronDown,
		searchTerms: createSearchTerms("ChevronDown")
	},
	{
		name: "ArrowLeft",
		Component: ArrowLeft,
		searchTerms: createSearchTerms("ArrowLeft")
	},
	{
		name: "ArrowRight",
		Component: ArrowRight,
		searchTerms: createSearchTerms("ArrowRight")
	},
	{
		name: "ArrowUp",
		Component: ArrowUp,
		searchTerms: createSearchTerms("ArrowUp")
	},
	{
		name: "ArrowDown",
		Component: ArrowDown,
		searchTerms: createSearchTerms("ArrowDown")
	},
	{
		name: "RefreshCw",
		Component: RefreshCw,
		searchTerms: createSearchTerms("RefreshCw")
	},
	{
		name: "RotateCcw",
		Component: RotateCcw,
		searchTerms: createSearchTerms("RotateCcw")
	},
	{ name: "Play", Component: Play, searchTerms: createSearchTerms("Play") },
	{ name: "Pause", Component: Pause, searchTerms: createSearchTerms("Pause") },
	{
		name: "SkipBack",
		Component: SkipBack,
		searchTerms: createSearchTerms("SkipBack")
	},
	{
		name: "SkipForward",
		Component: SkipForward,
		searchTerms: createSearchTerms("SkipForward")
	},
	{
		name: "Volume2",
		Component: Volume2,
		searchTerms: createSearchTerms("Volume2")
	},
	{
		name: "VolumeX",
		Component: VolumeX,
		searchTerms: createSearchTerms("VolumeX")
	},
	{ name: "Wifi", Component: Wifi, searchTerms: createSearchTerms("Wifi") },
	{
		name: "WifiOff",
		Component: WifiOff,
		searchTerms: createSearchTerms("WifiOff")
	},
	{
		name: "Battery",
		Component: Battery,
		searchTerms: createSearchTerms("Battery")
	},
	{
		name: "BatteryLow",
		Component: BatteryLow,
		searchTerms: createSearchTerms("BatteryLow")
	},
	{
		name: "Signal",
		Component: Signal,
		searchTerms: createSearchTerms("Signal")
	},
	{
		name: "Camera",
		Component: Camera,
		searchTerms: createSearchTerms("Camera")
	},
	{ name: "Image", Component: Image, searchTerms: createSearchTerms("Image") },
	{ name: "Video", Component: Video, searchTerms: createSearchTerms("Video") },
	{ name: "Mic", Component: Mic, searchTerms: createSearchTerms("Mic") },
	{
		name: "MicOff",
		Component: MicOff,
		searchTerms: createSearchTerms("MicOff")
	},
	{
		name: "Monitor",
		Component: Monitor,
		searchTerms: createSearchTerms("Monitor")
	},
	{
		name: "Smartphone",
		Component: Smartphone,
		searchTerms: createSearchTerms("Smartphone")
	},
	{
		name: "Tablet",
		Component: Tablet,
		searchTerms: createSearchTerms("Tablet")
	},
	{
		name: "Laptop",
		Component: Laptop,
		searchTerms: createSearchTerms("Laptop")
	},
	{
		name: "Server",
		Component: Server,
		searchTerms: createSearchTerms("Server")
	},
	{
		name: "Database",
		Component: Database,
		searchTerms: createSearchTerms("Database")
	},
	{
		name: "Folder",
		Component: Folder,
		searchTerms: createSearchTerms("Folder")
	},
	{ name: "File", Component: File, searchTerms: createSearchTerms("File") },
	{
		name: "FileText",
		Component: FileText,
		searchTerms: createSearchTerms("FileText")
	},
	{ name: "Files", Component: Files, searchTerms: createSearchTerms("Files") },
	{
		name: "FolderOpen",
		Component: FolderOpen,
		searchTerms: createSearchTerms("FolderOpen")
	},
	{
		name: "Archive",
		Component: Archive,
		searchTerms: createSearchTerms("Archive")
	},
	{
		name: "Bookmark",
		Component: Bookmark,
		searchTerms: createSearchTerms("Bookmark")
	},
	{ name: "Tag", Component: Tag, searchTerms: createSearchTerms("Tag") },
	{ name: "Map", Component: MapIcon, searchTerms: createSearchTerms("Map") },
	{
		name: "MapPin",
		Component: MapPin,
		searchTerms: createSearchTerms("MapPin")
	},
	{
		name: "Navigation",
		Component: Navigation,
		searchTerms: createSearchTerms("Navigation")
	},
	{
		name: "Compass",
		Component: Compass,
		searchTerms: createSearchTerms("Compass")
	},
	{ name: "Globe", Component: Globe, searchTerms: createSearchTerms("Globe") },
	{ name: "Link", Component: Link, searchTerms: createSearchTerms("Link") },
	{
		name: "ExternalLink",
		Component: ExternalLink,
		searchTerms: createSearchTerms("ExternalLink")
	},
	{
		name: "Paperclip",
		Component: Paperclip,
		searchTerms: createSearchTerms("Paperclip")
	},
	{
		name: "Printer",
		Component: Printer,
		searchTerms: createSearchTerms("Printer")
	},
	{ name: "Scan", Component: Scan, searchTerms: createSearchTerms("Scan") },
	{
		name: "QrCode",
		Component: QrCode,
		searchTerms: createSearchTerms("QrCode")
	},
	{
		name: "CreditCard",
		Component: CreditCard,
		searchTerms: createSearchTerms("CreditCard")
	},
	{
		name: "Wallet",
		Component: Wallet,
		searchTerms: createSearchTerms("Wallet")
	},
	{
		name: "DollarSign",
		Component: DollarSign,
		searchTerms: createSearchTerms("DollarSign")
	},
	{
		name: "ShoppingCart",
		Component: ShoppingCart,
		searchTerms: createSearchTerms("ShoppingCart")
	},
	{
		name: "ShoppingBag",
		Component: ShoppingBag,
		searchTerms: createSearchTerms("ShoppingBag")
	},
	{
		name: "Package",
		Component: Package,
		searchTerms: createSearchTerms("Package")
	},
	{ name: "Truck", Component: Truck, searchTerms: createSearchTerms("Truck") },
	{ name: "Users", Component: Users, searchTerms: createSearchTerms("Users") },
	{
		name: "UserPlus",
		Component: UserPlus,
		searchTerms: createSearchTerms("UserPlus")
	},
	{
		name: "UserMinus",
		Component: UserMinus,
		searchTerms: createSearchTerms("UserMinus")
	},
	{
		name: "UserCheck",
		Component: UserCheck,
		searchTerms: createSearchTerms("UserCheck")
	},
	{ name: "UserX", Component: UserX, searchTerms: createSearchTerms("UserX") },
	{
		name: "MessageCircle",
		Component: MessageCircle,
		searchTerms: createSearchTerms("MessageCircle")
	},
	{
		name: "MessageSquare",
		Component: MessageSquare,
		searchTerms: createSearchTerms("MessageSquare")
	},
	{ name: "Send", Component: Send, searchTerms: createSearchTerms("Send") },
	{
		name: "Filter",
		Component: Filter,
		searchTerms: createSearchTerms("Filter")
	},
	{
		name: "SortAsc",
		Component: SortAsc,
		searchTerms: createSearchTerms("SortAsc")
	},
	{
		name: "SortDesc",
		Component: SortDesc,
		searchTerms: createSearchTerms("SortDesc")
	},
	{
		name: "MoreHorizontal",
		Component: MoreHorizontal,
		searchTerms: createSearchTerms("MoreHorizontal")
	},
	{
		name: "MoreVertical",
		Component: MoreVertical,
		searchTerms: createSearchTerms("MoreVertical")
	},
	{ name: "Grid", Component: Grid, searchTerms: createSearchTerms("Grid") },
	{ name: "List", Component: List, searchTerms: createSearchTerms("List") },
	{
		name: "Layout",
		Component: Layout,
		searchTerms: createSearchTerms("Layout")
	},
	{
		name: "Sidebar",
		Component: Sidebar,
		searchTerms: createSearchTerms("Sidebar")
	},
	{
		name: "PanelLeft",
		Component: PanelLeft,
		searchTerms: createSearchTerms("PanelLeft")
	},
	{
		name: "PanelRight",
		Component: PanelRight,
		searchTerms: createSearchTerms("PanelRight")
	},
	{
		name: "Maximize",
		Component: Maximize,
		searchTerms: createSearchTerms("Maximize")
	},
	{
		name: "Minimize",
		Component: Minimize,
		searchTerms: createSearchTerms("Minimize")
	},
	{
		name: "Expand",
		Component: Expand,
		searchTerms: createSearchTerms("Expand")
	},
	{
		name: "Shrink",
		Component: Shrink,
		searchTerms: createSearchTerms("Shrink")
	},
	{
		name: "ZoomIn",
		Component: ZoomIn,
		searchTerms: createSearchTerms("ZoomIn")
	},
	{
		name: "ZoomOut",
		Component: ZoomOut,
		searchTerms: createSearchTerms("ZoomOut")
	},
	{ name: "Focus", Component: Focus, searchTerms: createSearchTerms("Focus") },
	{
		name: "Target",
		Component: Target,
		searchTerms: createSearchTerms("Target")
	},
	{
		name: "Activity",
		Component: Activity,
		searchTerms: createSearchTerms("Activity")
	},
	{
		name: "TrendingUp",
		Component: TrendingUp,
		searchTerms: createSearchTerms("TrendingUp")
	},
	{
		name: "TrendingDown",
		Component: TrendingDown,
		searchTerms: createSearchTerms("TrendingDown")
	},
	{
		name: "BarChart",
		Component: BarChart,
		searchTerms: createSearchTerms("BarChart")
	},
	{
		name: "LineChart",
		Component: LineChart,
		searchTerms: createSearchTerms("LineChart")
	},
	{
		name: "PieChart",
		Component: PieChart,
		searchTerms: createSearchTerms("PieChart")
	},
	{
		name: "Calculator",
		Component: Calculator,
		searchTerms: createSearchTerms("Calculator")
	},
	{ name: "Timer", Component: Timer, searchTerms: createSearchTerms("Timer") },
	{ name: "Sun", Component: Sun, searchTerms: createSearchTerms("Sun") },
	{ name: "Moon", Component: Moon, searchTerms: createSearchTerms("Moon") },
	{ name: "Cloud", Component: Cloud, searchTerms: createSearchTerms("Cloud") },
	{
		name: "CloudRain",
		Component: CloudRain,
		searchTerms: createSearchTerms("CloudRain")
	},
	{ name: "Zap", Component: Zap, searchTerms: createSearchTerms("Zap") },
	{ name: "Flame", Component: Flame, searchTerms: createSearchTerms("Flame") },
	{
		name: "Droplets",
		Component: Droplets,
		searchTerms: createSearchTerms("Droplets")
	},
	{ name: "Wind", Component: Wind, searchTerms: createSearchTerms("Wind") },
	{
		name: "Thermometer",
		Component: Thermometer,
		searchTerms: createSearchTerms("Thermometer")
	},
	{
		name: "Umbrella",
		Component: Umbrella,
		searchTerms: createSearchTerms("Umbrella")
	},
	{
		name: "TreePine",
		Component: TreePine,
		searchTerms: createSearchTerms("TreePine")
	},
	{
		name: "Flower",
		Component: Flower,
		searchTerms: createSearchTerms("Flower")
	},
	{ name: "Leaf", Component: Leaf, searchTerms: createSearchTerms("Leaf") },
	{ name: "Bug", Component: Bug, searchTerms: createSearchTerms("Bug") },
	{ name: "Fish", Component: Fish, searchTerms: createSearchTerms("Fish") },
	{ name: "Bird", Component: Bird, searchTerms: createSearchTerms("Bird") },
	{ name: "Car", Component: Car, searchTerms: createSearchTerms("Car") },
	{ name: "Bus", Component: Bus, searchTerms: createSearchTerms("Bus") },
	{ name: "Train", Component: Train, searchTerms: createSearchTerms("Train") },
	{ name: "Plane", Component: Plane, searchTerms: createSearchTerms("Plane") },
	{ name: "Bike", Component: Bike, searchTerms: createSearchTerms("Bike") },
	{ name: "Fuel", Component: Fuel, searchTerms: createSearchTerms("Fuel") },
	{
		name: "Wrench",
		Component: Wrench,
		searchTerms: createSearchTerms("Wrench")
	},
	{
		name: "Hammer",
		Component: Hammer,
		searchTerms: createSearchTerms("Hammer")
	},
	{
		name: "Scissors",
		Component: Scissors,
		searchTerms: createSearchTerms("Scissors")
	},
	{ name: "Ruler", Component: Ruler, searchTerms: createSearchTerms("Ruler") },
	{
		name: "Paintbrush",
		Component: Paintbrush,
		searchTerms: createSearchTerms("Paintbrush")
	},
	{
		name: "Palette",
		Component: Palette,
		searchTerms: createSearchTerms("Palette")
	},
	{ name: "Brush", Component: Brush, searchTerms: createSearchTerms("Brush") },
	{
		name: "Eraser",
		Component: Eraser,
		searchTerms: createSearchTerms("Eraser")
	},
	{
		name: "Pencil",
		Component: Pencil,
		searchTerms: createSearchTerms("Pencil")
	},
	{
		name: "PenTool",
		Component: PenTool,
		searchTerms: createSearchTerms("PenTool")
	},
	{ name: "Type", Component: Type, searchTerms: createSearchTerms("Type") },
	{ name: "Bold", Component: Bold, searchTerms: createSearchTerms("Bold") },
	{
		name: "Italic",
		Component: Italic,
		searchTerms: createSearchTerms("Italic")
	},
	{
		name: "Underline",
		Component: Underline,
		searchTerms: createSearchTerms("Underline")
	},
	{ name: "Code", Component: Code, searchTerms: createSearchTerms("Code") },
	{
		name: "Terminal",
		Component: Terminal,
		searchTerms: createSearchTerms("Terminal")
	},
	{
		name: "Command",
		Component: Command,
		searchTerms: createSearchTerms("Command")
	},
	{ name: "Hash", Component: Hash, searchTerms: createSearchTerms("Hash") },
	{
		name: "AtSign",
		Component: AtSign,
		searchTerms: createSearchTerms("AtSign")
	},
	{
		name: "Percent",
		Component: Percent,
		searchTerms: createSearchTerms("Percent")
	},
	{
		name: "ToggleLeft",
		Component: ToggleLeft,
		searchTerms: createSearchTerms("ToggleLeft")
	},
	{
		name: "ToggleRight",
		Component: ToggleRight,
		searchTerms: createSearchTerms("ToggleRight")
	},
	{
		name: "Lightbulb",
		Component: Lightbulb,
		searchTerms: createSearchTerms("Lightbulb")
	},
	{ name: "Award", Component: Award, searchTerms: createSearchTerms("Award") },
	{
		name: "Trophy",
		Component: Trophy,
		searchTerms: createSearchTerms("Trophy")
	},
	{ name: "Medal", Component: Medal, searchTerms: createSearchTerms("Medal") },
	{ name: "Gift", Component: Gift, searchTerms: createSearchTerms("Gift") },
	{
		name: "PartyPopper",
		Component: PartyPopper,
		searchTerms: createSearchTerms("PartyPopper")
	},
	{ name: "Cake", Component: Cake, searchTerms: createSearchTerms("Cake") },
	{
		name: "Coffee",
		Component: Coffee,
		searchTerms: createSearchTerms("Coffee")
	},
	{ name: "Pizza", Component: Pizza, searchTerms: createSearchTerms("Pizza") }
]

const ICON_MAP = new Map(ICON_REGISTRY.map(icon => [icon.name, icon]))

export const getIcon = (name: string) => ICON_MAP.get(name)

export const searchIcons = (query: string): IconData[] => {
	if (!query.trim()) return ICON_REGISTRY

	const searchTerm = query.toLowerCase().trim()
	return ICON_REGISTRY.filter(icon => icon.searchTerms.includes(searchTerm))
}
