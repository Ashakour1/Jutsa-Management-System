import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ServiceCard({ title, description, imageUrl }) {
  return (
    <Card className="h-full shadow-lg rounded-lg">
      <CardHeader className="overflow-hidden">
        {/* Standard img tag for React */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-2 text-lg font-semibold">{title}</CardTitle>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;
