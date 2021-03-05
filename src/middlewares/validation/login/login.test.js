const P = require('./login');

describe('Testing login validation:', () => {
  const next = () => 42;
  const buildReq = req => ({ body: { login: req } });
  const res = {
    status: jest.fn(code => res),
    json: jest.fn(obj => res)
  };

  test('No login provided', () => {
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
    
  test('Forbiden symbols', () => {
    P(buildReq("Ab2ж"), res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  });
    
  test('Correct case', () => {
    expect(P(buildReq("-Corr43t_l0g1n-"), null, next)).toBe(42);
  });
})

