import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";



// Stat card props interface
interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: any;
    bgColor: string;
    iconColor: string;
}



export default function StatCard({ title, value, description, icon : Icon, bgColor, iconColor }: StatCardProps) {


    return (



        <Card className={`card-elevated ${bgColor} group relative overflow-hidden`}>


            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />


            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">

                <CardTitle className="text-sm font-medium">{title}</CardTitle>

                <div className={`p-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm`}>
                    <Icon className={`h-5 w-5 ${iconColor}`} />
                </div>

            </CardHeader>


            <CardContent className="relative z-10">

                <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {value}
                </div>

                <p className="text-xs dark:text-gray-300 text-gray-700 ">{description}</p>

            </CardContent>



        </Card>



    )



}
