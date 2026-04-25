import { AuthForm } from "@/components/AuthForm";
import { FiShield, FiUsers, FiHeart } from "react-icons/fi";

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-badge">Quick access</div>
          <h1>Join the platform</h1>
          <p>No password needed. Connect as a farmer or buyer in seconds.</p>
        </div>
        
        <div className="auth-content">
          <AuthForm presetRole={resolvedSearchParams.role} />
          
          <div className="auth-features">
            <div className="feature">
              <FiShield className="feature-icon" />
              <h3>Secure & Fast</h3>
              <p>No passwords to remember</p>
            </div>
            <div className="feature">
              <FiUsers className="feature-icon" />
              <h3>Direct Connection</h3>
              <p>Connect directly with farmers/buyers</p>
            </div>
            <div className="feature">
              <FiHeart className="feature-icon" />
              <h3>Fair Prices</h3>
              <p>Eliminate middlemen costs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
