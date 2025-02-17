export default function About() {
    return (
      <div className="min-h-screen">
        <section className="relative py-20 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-b-[100px]" />
          <div className="relative">
            <h1 className="text-4xl font-bold mb-4">About Smart Tools Hub</h1>
            <p className="text-gray-600">Learn more about our platform</p>
          </div>
        </section>
  
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                Smart Tools Hub aims to provide a comprehensive suite of everyday tools that enhance productivity and
                simplify tasks. Our platform brings together essential utilities in one convenient location.
              </p>
            </div>
  
            <div>
              <h2 className="text-2xl font-semibold mb-4">Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-2">Calculator</h3>
                  <p className="text-gray-600">A powerful calculator with support for basic mathematical operations.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-2">To-Do List</h3>
                  <p className="text-gray-600">Manage your tasks with user attribution and due dates.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-2">Notes</h3>
                  <p className="text-gray-600">Quick and easy note-taking with rich text support.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                  <h3 className="text-lg font-medium mb-2">Polling System</h3>
                  <p className="text-gray-600">Create and participate in polls with real-time results.</p>
                </div>
              </div>
            </div>
  
            <div>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600">
                Have questions or suggestions? We&apos;d love to hear from you. Reach out to our team for support and feedback.
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
  
  