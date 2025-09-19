import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

const Welcome = () => {
  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {/* Hero Section */}
        <Card className='shadow-md rounded-2xl col-span-1 md:col-span-2 lg:col-span-3 bg-background_light'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold text-gray-800 text-center'>
              Welcome to Football-Stats!
            </CardTitle>
          </CardHeader>
          <CardContent className='text-center text-gray-600'>
            <p></p>
          </CardContent>
        </Card>

        {/* News Section */}
        <Card className='shadow-md rounded-2xl bg-background_light'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-800'>News</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold text-gray-700'>
                New functionality - betting on matches
              </h3>
              <p className='text-gray-600'>
                We've added a new feature that lets you bet on points! Check it out now!
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-test2'>App Version</h3>
              <p className='text-test2'>1.0.0</p>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Section */}
        <Card className='shadow-md rounded-2xl col-span-1 md:col-span-2 lg:col-span-1 bg-background_light'>
          <CardHeader>
            <CardTitle className='text-2xl font-semibold text-gray-800'>Important Notes:</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='font-semibold text-gray-700'>Results updates</h3>
              <p className='text-gray-600'>
                Due to external API limitations, results are updated daily at 12:00 AM Polish time.
              </p>
            </div>
            <div>
              <h3 className='font-semibold text-gray-700'>Availability</h3>
              <p className='text-gray-600'>Content available only after logging in</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;
