const P = require('./password');

describe('Testing password validation:', () => {
  const next = () => 42;
  const buildReq = req => ({ body: { password: req } });
  const res = {
    status: jest.fn(code => res),
    json: jest.fn(obj => res)
  };

  test('No password provided', () => {
    P({}, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });

  test('Length < 4', () => {
    P(buildReq("Ab2"), res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });

  test('Length > 32', () => {
    P(buildReq("Aa23Aa23Aa23Aa23Aa23Aa23Aa23Aa23Aa23Aa23Aa23"), res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });

  test('Lowercase only', () => {
    P(buildReq("4abc"), res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });

  test('Uppercase only', () => {
    P(buildReq("4ABC"), res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });
    
  test('Letters only', () => {
    P(buildReq("AbCd"), res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });

  test('No numbers', () => {
    P(buildReq("Ab!&"), res, next);
    
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });
    
  test('Forbiden symbols', () => {
    P(buildReq("Ab2ж"), res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });
    
  test('Correct case', () => {
    expect(P(buildReq("S4mpl3_Passw0rd"), res, next)).toBe(42);
  });
})

