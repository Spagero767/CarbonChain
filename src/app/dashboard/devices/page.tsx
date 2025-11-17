import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { iotDevices } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { Wind, Droplets, Sun, TreePine } from "lucide-react"

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "Forestry Sensor":
      return <TreePine className="h-5 w-5 text-muted-foreground" />;
    case "Energy Meter":
      return <Sun className="h-5 w-5 text-muted-foreground" />;
    case "Water Flow Meter":
      return <Droplets className="h-5 w-5 text-muted-foreground" />;
    default:
      return <Wind className="h-5 w-5 text-muted-foreground" />;
  }
}

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">IoT Devices</h1>
        <p className="text-muted-foreground">Monitor and manage connected devices from carbon offset projects.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {iotDevices.map((device) => (
          <Card key={device.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{device.id}</CardTitle>
              {getDeviceIcon(device.type)}
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{device.projectName}</div>
              <p className="text-xs text-muted-foreground">{device.type}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "h-2 w-2 rounded-full",
                  device.status === 'Online' ? 'bg-green-500' : 'bg-red-500'
                )} />
                <span className={cn(
                  device.status === 'Online' ? 'text-green-600' : 'text-red-600'
                )}>
                  {device.status}
                </span>
              </div>
              <span className="text-muted-foreground">
                {formatDistanceToNow(new Date(device.lastPing), { addSuffix: true })}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
