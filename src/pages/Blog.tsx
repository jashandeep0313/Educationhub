import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogSection from "@/components/home/BlogSection";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Page hero */}
        <div className="py-16 bg-muted/30 border-b border-border text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            Our <span className="text-gradient-primary">Blog</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Expert insights, exam tips, and student success stories from the IQ
            Education Hub team.
          </p>
        </div>
        <BlogSection preview={false} />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
